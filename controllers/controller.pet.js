module.exports = {
    add: (req, res) => {
        res.send("add")
    },

    viewAll: (req, res) => {
        res.send("viewAll")   
    },

    viewPet: (req, res) => {
        res.send("getPet")
    },

    updatePet: (req, res) => {
        res.send("updatePet")
    }, 

    deletePet: (req, res) => {
        res.send("deletePet")
    }

}