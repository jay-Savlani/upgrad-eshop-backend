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
            
        },
        product_id: {
            type: Number,
            required: true,
            unique: true
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
    const Product = mongoose.model("product", productSchema);

    return Product;
    
}