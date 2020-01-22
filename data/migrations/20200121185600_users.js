
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.text('username', 32).unique().notNullable()
    tbl.text('password').notNullable()
    tbl.string('department', 5)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
