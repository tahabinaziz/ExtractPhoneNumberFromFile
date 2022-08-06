const db = require('../../models');
const GermanPhone = db.Germanphonenumber;
const multer = require('multer');
const path = require("path")
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/uploads/phonenumbers/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
            "-" +
            Date.now() +
            path.extname(file.originalname).toLocaleLowerCase()
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".txt") {
            return callback(new Error("Only .txt files are allowed"));
        }
        callback(null, true);
    },
}).single("phone_numbers");

exports.uploadFile = async (req, res) => {
    try {
        upload(req, res, async  function (err) {
            if (err) {
                res.status(400).json({
                    message:
                        err.message == "File too large"
                            ? err.message + " the maximum is 2 Mb"
                            : err.message,
                });
            } else {
                    /*Timestamp */
                    let timestamp = Date.now();
                    let taskId = req.file.fieldname+'_'+timestamp;
                /*Read data from file */
              await  fs.readFile(req.file.path, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: err.message });
                    }
                    /*Split data from .txt file */
                    const allNumbers = data.toString().replace(/ /g, '').split('\n');
                    for (let germanNumber of allNumbers) {
                        /*Filter german numbers */
                        /*11 digits after +49 or 0049. */
                        if (germanNumber.length == 14 && germanNumber.startsWith('+49') || germanNumber.length == 15 && germanNumber.startsWith('0049')) {
                            let numbers = { phone: germanNumber,taskId: taskId};
                             GermanPhone.create(numbers);
                        }
                    }
                })
                return res.status(200).json({TaskId:taskId});
            }
        });
    }
    catch (err) { /*Error handling */
       return res.status(500).json({ error: err.message });
    }
}


exports.phonenumbers = async (req,res) => {
    try{
        let phonenumber = await GermanPhone.findAll();
        let count = phonenumber.length;
        if(phonenumber){/*If data exist send it to response */
            return res.status(200).json({count,phonenumber});
        }
        return res.status(404).json({ message: "Not Found" }); /*Show no data found */
    }
    catch (err) { /*Error handling */
       return res.status(500).json({ error: err.message });
    }
}

exports.phonenumbersByTaskId = async (req,res) => {
    try{
        const {taskId} = req.params;
        let phonenumber = await GermanPhone.findAll({where:{taskId:taskId}});
        let count = phonenumber.length;
        if(count >= 0){/*If data exist send it to response */
            return res.status(200).json({count,phonenumber});
        }
        return res.status(404).json({ message: "Not Found" }); /*Show no data found */
    }
    catch (err) { /*Error handling */
       return res.status(500).json({ error: err.message });
    }
}

exports.deletephonenumbersByTaskId = async (req,res) => {
    try{
        const {taskId} = req.params;
        let phonenumber = await GermanPhone.findAll({where:{taskId:taskId}});
        let count = phonenumber.length;
        if(count >= 0){/*If data exist go ahead */
        await GermanPhone.destroy({
            where: { taskId: taskId },
          });
        return res.status(200).json({ message: "Phone numbers delete successfully" });
        }
        return res.status(404).json({ message: "Not Found" }); /*Show no data found */
    }
    catch (err) { /*Error handling */
       return res.status(500).json({ error: err.message });
    }
}