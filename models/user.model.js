module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: true
        }
    }, {timeStamps: true});

    userSchema.pre('save', (next) => {
        if(!this.createdAt && !this.updatedAt) {
            this.createdAt = new Date();
            this.updatedAt = new Date();
        } 

        if(this.createdAt) {
            this.updatedAt = new Date();
        }
        next();
    });
    const User = new mongoose.model(userSchema);

    return User;
    
}