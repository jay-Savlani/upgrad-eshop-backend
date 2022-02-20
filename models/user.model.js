module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        user_id: {
            type: Number,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: false
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
            
        },
        updatedAt: {
            type: Date,
        }
    }, {timestamps: true});

    userSchema.pre('save', function(next){
       
    
        if(!this.createdAt && !this.updatedAt) {
           
            this.createdAt = new Date();
            
            this.updatedAt = new Date();
        } 

        if(this.createdAt) {
            this.updatedAt = new Date();
        }
        next();
    });
    const User = mongoose.model("user", userSchema);

    return User;
    
}