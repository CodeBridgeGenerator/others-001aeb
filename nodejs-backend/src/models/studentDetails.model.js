
    module.exports = function (app) {
        const modelName = 'student_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            firstName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
lastName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
age: { type: Number, required: false, max: 10000000 },
dateOfBirth: { type: Date, required: false },
address: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
emailAddress: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
gender: { type: String, required: false , enum: ["Male","Female"] },
mobileNumber: { type: Number, required: false, max: 10000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };