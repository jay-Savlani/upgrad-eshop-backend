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
    const Address = mongoose.model("user", userSchema);

    return Address;
}