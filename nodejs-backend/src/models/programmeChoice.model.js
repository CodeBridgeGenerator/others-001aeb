
    module.exports = function (app) {
        const modelName = 'programme_choice';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            intakeYear: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
courseName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
month: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
campusLocation: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
mode: { type: String, required: false , enum: ["FullTime","PartTime"] },

            
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