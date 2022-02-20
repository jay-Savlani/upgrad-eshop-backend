const User = require("./user.model");

module.exports = (mongoose) => {


    const addressSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            requred: true
        },
        street: {
            type: String,
            requred: true
        },
        landmark: {
            type: String,
            requred: false
        },
        city: {
            type: String,
            requred: true
        },
        state: {
            type: String,
            requred: true
        },
        zipcode: {
            type: String,
            requred: true
        },
        createdAt: {
            type: Date,
            
        },
        updatedAt: {
            type: Date,
            
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        address_id: {
            type: Number,
            required: true,
            unique: true
        }

    }, {timestamps: true});

    addressSchema.pre('save', function(next){
       
    
        if(!this.createdAt && !this.updatedAt) {
           
            this.createdAt = new Date();
            
            this.updatedAt = new Date();
        } 

        if(this.createdAt) {
            this.updatedAt = new Date();
        }
        next();
    });
    const Address = mongoose.model("address", addressSchema);

    return Address;
}