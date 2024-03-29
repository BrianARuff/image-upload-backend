
exports.up = function(knex, Promise) {
  return knex.schema.createTable("images", (table) => {
    table.increments();
    table.string("image", 1000000).notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("images");
};
