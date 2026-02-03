export const tableStatements = [
  `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    category VARCHAR,
    subcategory VARCHAR,
    type VARCHAR,
    created_at INTEGER NOT NULL,
    par REAL,
    last_updated INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS inventory_states (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    type VARCHAR,
    quantity REAL,
    unit STRING
  );`,
  `CREATE TABLE IF NOT EXISTS inventory_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    type VARCHAR,
    quantity REAL NOT NULL,
    unit STRING,
    timestamp INTEGER NOT NULL,
    notes STRING,
    FOREIGN KEY(item_id) REFERENCES items(id)
  );`,
  `CREATE TABLE IF NOT EXISTS item_daily_usages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    date INTEGER NOT NULL,
    usage_amount REAL NOT NULL,
    usage_unit STRING,
    FOREIGN KEY(item_id) REFERENCES items(id)
  );`,
  `CREATE TABLE IF NOT EXISTS purchase_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type STRING NOT NULL,
    item_id INTEGER NOT NULL,
    created_at INTEGER,
    purchase_date INTEGER NOT NULL,
    purchase_unit VARCHAR NOT NULL,
    purchase_amount FLOAT NOT NULL,
    inventory_unit VARCHAR,
    inventory_amount FLOAT,
    vendor_id INTEGER,
    brand TEXT,
    receipt_uri STRING,
    cost FLOAT NOT NULL,
    FOREIGN KEY(item_id) REFERENCES items(id),
    FOREIGN KEY(vendor_id) REFERENCES vendors(id)
  );`,
  `CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    ingredients JSON NOT NULL,
    yield_amount INTEGER NOT NULL,
    yield_unit VARCHAR NOT NULL,
    nute_concentration REAL,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS recipe_batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    real_item_id INTEGER,
    real_volume REAL NOT NULL,
    real_volume_unit STRING NOT NULL,
    quantity REAL NOT NULL,
    real_weight REAL NOT NULL,
    real_weight_unit STRING NOT NULL,
    loss REAL NOT NULL,
    name STRING NOT NULL,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS cultures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR,
    status VARCHAR,
    created_at INTEGER NOT NULL,
    recipe_batch_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    unit STRING NOT NULL,
    last_updated INTEGER NOT NULL,
    sterilized_id INTEGER,
    inoculated_id INTEGER,
    germinated_id INTEGER,
    colonized_id INTEGER,
    contaminated_id INTEGER,
    harvested_id INTEGER,
    FOREIGN KEY(recipe_batch_id) REFERENCES recipe_batches(id),
    FOREIGN KEY(sterilized_id) REFERENCES sterilizations(id),
    FOREIGN KEY(inoculated_id) REFERENCES inoculatations(id),
    FOREIGN KEY(germinated_id) REFERENCES germinatations(id),
    FOREIGN KEY(colonized_id) REFERENCES colonizations(id),
    FOREIGN KEY(contaminated_id) REFERENCES contaminatations(id),
    FOREIGN KEY(harvested_id) REFERENCES harvests(id)
  );`, 
  `CREATE TABLE IF NOT EXISTS sterilizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS inoculations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS germinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS colonizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS contaminations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS harvests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notes STRING,
    created_at INTEGER NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING NOT NULL,
    start INTEGER NOT NULL,
    end INTEGER NOT NULL,
    notes STRING
  );`,
  `CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING NOT NULL,
    email STRING,
    phone STRING,
    address STRING,
    contact_name STRING,
    website STRING,
    last_updated STRING
  );`,
  `CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING NOT NULL,
    website STRING, 
    last_updated STRING
  );`
]

export const indexStatements = [
  `
    CREATE INDEX IF NOT EXISTS idx_items_type
    ON items (type);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_item_daily_usages_item_id
    ON item_daily_usages (item_id);
  `,
  `
    CREATE INDEX IF NOT EXISTS item_daily_usages_by_date
    ON item_daily_usages (date);
  `,
  `
    CREATE INDEX IF NOT EXISTS raw_materials
    ON items (type) WHERE type = 'raw_materials';
  `,
  `
    CREATE INDEX IF NOT EXISTS bio_materials
    ON items (type) WHERE type = 'bio_materials';`,
  `
    CREATE INDEX IF NOT EXISTS hardware_items
    ON items (type) WHERE type = 'hardware_items';
  `,
  `
    CREATE INDEX IF NOT EXISTS consumable_items
    ON items (type) WHERE type = 'consumable_items';
  `,
  `
    CREATE INDEX IF NOT EXISTS inventory_states_by_item_id
    ON inventory_states (item_id);
  `,
  `
    CREATE INDEX IF NOT EXISTS inventory_events_by_type
    ON inventory_states (type, item_id);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_inventory_events_item_id
    ON inventory_events (item_id, type);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_purchase_logs_type
    ON purchase_logs (type);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_purchase_logs_receipt_uri
    ON purchase_logs (receipt_uri);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_bio_material_purchase_logs_item_id 
    ON bio_material_purchase_logs(item_id);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_consumable_item_purchase_logs_item_id 
    ON consumable_item_purchase_logs(item_id);
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_hardware_item_purchase_logs_item_id 
    ON hardware_item_purchase_logs(item_id);
  `
]
  
  