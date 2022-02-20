module.exports = (mongoose) => {
    const orderSchema = mongoose.Schema({
       user:{
           type: mongoose.Schema.Types.ObjectId,
           required: false,
           ref: "user"
       },
       address: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "address"
       },
       product: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "product"
       },
       quantity: {
           type: Number,
           required: true
       },
       amount: {
           type: Number,
           required: true
       },
       order_id: {
            type: Number,
            required: true,
            unique: true
       },
       createdAt: {
           type: Date,
           required: false
       }
    }, { timestamps: true });

    orderSchema.pre('save', function (next) {

        if (!this.createdAtt) {

            this.createdAt = new Date();


        }
        next();
    });
    const Order = mongoose.model("order", orderSchema);

    return Order;

}