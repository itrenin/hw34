const promptly = require('promptly')
const signale = require('signale')
const db = require('./model/db')
const auth = require('./libs/auth')

function validatorPassword(value) {
  if (value.length < 8) {
    signale.warn('Пароль должен быть не менее 8-ми символов')
    throw new Error()
  }

  return value
}

function validatorEmail(value) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  if (reg.test(value)) {
    return value
  } else {
    signale.warn('Не корректный email')
    throw new Error()
  }
}

async function askForPasswords() {
  const password = await promptly.password('Введите пароль: ', {
    replace: '*',
    validator: validatorPassword,
  })
  const repeatPassword = await promptly.password('Повторите пароль: ', {
    replace: '*',
    validator: validatorPassword,
  })

  if (password === repeatPassword) {
    return password
  } else {
    signale.warn('Пароли не совпадают. Попробуйте еще раз!')
    return askForPasswords()
  }
}

async function registerUser(email, password) {
  auth.setLogin({
    email,
    password,
  })
  signale.success(`Регистрация прошла успешно для пользователя: ${email}`)
}

async function main() {
  const email = await promptly.prompt('Введите email пользователя: ', {
    validator: validatorEmail,
  })

  const isContainsEmail = db.get('users').find({ email }).value() ? true : false

  if (isContainsEmail) {
    signale.warn(`Такой пользователь уже существует. Попробуйте еще!`)
    main()
  } else {
    const password = await askForPasswords()

    registerUser(email.trim(), password.trim())
  }
}

main()
