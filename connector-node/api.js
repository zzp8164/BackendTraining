const axios = require('axios');

class Api {}
Api.login = async (user) => {
    if (user.name) {
        const res = await axios.post("http://localhost:1337/login", {
            name: user.name
        })
        if (res.status == 200) {
            console.log("login successfuly with user id " + user.name)
        }
        return
    }
}

module.exports = Api