// import bookshelf from '../bookshelf';
import mongoose, {Schema} from 'mongoose';
/*export default bookshelf.Model.extend({
  tableName: 'users'
});*/
let UserSchema = new Schema({
    username : {type: String},
    email: {type: String},
    password: {type: String},
    timezone: {type: String},

});
// export default UserSchema;
export default mongoose.model('User', UserSchema);

