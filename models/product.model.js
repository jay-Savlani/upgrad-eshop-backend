module.exports = (mongoose) => {
    const productSchema = mongoose.Schema({
        
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        availableItems: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        
        createdAt: {
            type: Date,
            
        },
        updatedAt: {
            type: Date,
            
        }
    }, {timestamps: true});

   

    productSchema.pre('save', function(next){
       
    
        if(!this.createdAt && !this.updatedAt) {
           
            this.createdAt = new Date();
            
            this.updatedAt = new Date();
        } 

        if(this.createdAt) {
            this.updatedAt = new Date();
        }
        next();
    });

    productSchema.pre('updateOne', function(next) {
        console.log("Entered pre update");
        this.updatedAt = new Date();
        next();
    })

    productSchema.index({name: "text"})

    const Product = mongoose.model("product", productSchema);
    

    

    return Product;
    
}