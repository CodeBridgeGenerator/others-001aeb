
    module.exports = function (app) {
        const modelName = 'parents_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parentsFirstName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
parentsLastName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
address: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
homePhone: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
mobilePhone: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
parentsEmailAdd: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
employment: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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