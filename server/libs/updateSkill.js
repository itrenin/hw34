const db = require('../model/db')

module.exports = {
  updateSkill: (skillName, cb) => {
    //const { age, concerts, cities, years } = skillName

    if (Object.keys(skillName).length) {
      for (item in skillName) {
        db.get('skills')
          .find({ name: item })
          .assign({ number: skillName[item] })
          .write()
       // console.log (item + ': ' + skillName[item])
      }
    } else cb(new Error('Ничего не передано'))

    //console.log(skillName)
  },
}
