paymentModule.factory('PaymentService', function(DB_URL) {



			return  {


					getAllusers : function(callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.users = new Datastore({ filename:DB_URL+'/users.db',autoload: true });

											db.users.find({}, function (err, stds) {
												if(err)
															console.log(err);
														else

															callback(stds);

											});
					},

					removeuser: function(user,callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.users = new Datastore({ filename:DB_URL+'/users.db',autoload: true });

						db.users.remove({ _id: user._id }, {}, function (err, numRemoved) {
							if(err)
									console.log(err);
								else
									{
									db.users.persistence.compactDatafile();
									callback(numRemoved);
								}
						});

					},
					upsertuser: function(user,callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.users = new Datastore({ filename:DB_URL+'/users.db',autoload: true });

						db.users.update({_id: user._id}, {
									firstname: user.firstname,
									lastname: user.lastname,
									_levelId: user._levelId,
									class: user.class,
									price: user.price
						},{upsert:true}, function(err,numReplaced,lv) {
							if(err)
									console.log(err);
								else
									{
									db.users.persistence.compactDatafile();
									callback(lv);
								}
						});
			}
		};

});
