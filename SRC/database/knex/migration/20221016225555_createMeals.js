
exports.up = knex => knex.schema.createTable("Meals", table => {
  table.increments("id");
  table.text("imgUrl");
  table.text("title");
  table.text("text");
  table.text("price");
  table.text("ingredients");
  table.integer("type");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("Meals");
  