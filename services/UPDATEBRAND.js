const { query } = require("../database/database")

async function UPDATEBRAND(ID, RESOURCE){
	const {name, slug } = RESOURCE

	await query({
		sql: "UPDATE brands SET name = ?, slug = ? WHERE id = ?",
		values: [name, slug, ID]
	})
}

module.exports = UPDATEBRAND