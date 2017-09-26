var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Management Model
 * ==========
 */
var Management = new keystone.List('Management');

Management.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Management.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Management.defaultColumns = 'name, email, isAdmin';
Management.register();
