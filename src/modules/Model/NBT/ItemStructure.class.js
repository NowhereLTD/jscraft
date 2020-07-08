const {ServerError, NBTNumberNotInRangeError} = require("../../Utils/ServerError.class.js");

/**
  * VERSION SUPPORT: 1.8 -> ?
  */
class ItemStructure {
  constructor() {
    // Init General
    this.general = [];
    this.general.damage = null;
    this.general.unbreakable = null;
    this.general.canDestroy = null;
    this.general.customModelData = null;

    // Block Tags
    this.block = [];
    this.block.canPlaceOn = null;
    this.block.blockEntityTag = null;
    this.block.blockStateTag = null;

    // Enchantments
    this.enchantments = [];
    this.storedEnchantments = [];
    this.repairCost = null;

    // Attribute Modifiers
    this.attributes = [];

    // potion effect
    this.potionEffects = [];
    this.potion = null;

    // TODO: Crossbow

    // Display
    this.display = [];
    this.display.display = [];
    this.display.display.color = null;
    this.display.display.name = null;
    this.display.display.lore = [];
    this.display.hideFlags = null;

    // Books
    this.resolved = null;
    this.generation = null;
    this.author = null;
    this.title = null;
    this.pages = [];

    // Player Head
    this.skullOwner = [];
    this.skullOwner.id = null;
    this.skullOwner.name = null;
    this.skullOwner.properties = [];
    this.skullOwner.properties.texture = null;

    // Fireworks
    this.fireworks = [];
    this.fireworks.flight = null;
    this.fireworks.explosions = null;

    // Firework Star
    this.explosion = [];
    this.explosion.flicker = null;
    this.explosion.trail = null;
    this.explosion.type = null;
    this.explosion.colors = [];
    this.explosion.fadeColors = [];

  }

  /**
   * createEnchantment - Create a new Item Enchantment
   *
   * @param  string id The enchantment id
   * @param  int level The level of enchantment
   */
  createEnchantment(id, level) {
    this.enchantments.push({id: {type: 'short', value: id}, lvl: {type: 'short', value: level}});
  }


  /**
   * createStoredEnchantment - Create a enchantment for books
   *
   * @param  int id    the enchantment id
   * @param  int level the level of enchantment
   */
  createStoredEnchantment(id, level) {
    this.storedEnchantments.push({id: {type: 'string', value: id}, lvl: {type: 'short', value: level}});
  }


  /**
   * createAttribute - Create a new attribute modifier to modifier item
   *
   * @param  string attributeName the name of attribute
   * @param  string name          the name of modifier (has no effect)
   * @param  string slot          the slot to take a effect ("mainhand", "offhand", "feet", "legs", "chest", "head")
   * @param  int operation        modifier operation (add [id=0], multiply_base [id=1], multiply [id=2])
   * @param  double amount        the amount of change
   * @param  long uuidMost        uppermost bits of the modifier's UUID
   * @param  long uuidLeast       lowermost bits of the modifier's UUID
   */
  createAttribute(attributeName, name, slot, operation, amount, uuidMost, uuidLeast) {
    this.attributes.push({AttributeName: {type: 'string', value: attributeName}, Name: {type: 'string', value: name}, Slot: {type: 'string', value: slot}, Operation: {type: 'int', value: operation}, Amount: {type: 'double', value: amount}, UUIDMost: {type: 'long', value: uuidMost}, UUIDLeast: {type: 'long', value: uuidLeast}});
  }


  createTexture(url, options = {}) {
    let cacheTextureData = {};
    if(options.timestamp !== undefined){
      cacheTextureData.timestamp = {
        type: "long",
        value: options.timestamp
      }
    }

    if(options.profileId !== undefined){
      cacheTextureData.profileId = {
        type: "string",
        value: options.profileId
      }
    }

    if(options.profileName !== undefined){
      cacheTextureData.profileName = {
        type: "string",
        value: options.profileName
      }
    }

    if(options.isPublic !== undefined){
      cacheTextureData.isPublic = {
        type: "string",
        value: options.isPublic
      }
    }

    cacheTextureData.textures = {
      type: "compound",
      value: {
        SKIN: {
          type: "compound",
          value: {
            url: {
              type: "string",
              value: url
            }
          }
        }
      }
    }

    let cacheTexture = {type: "compound", value: {}};
    cacheTexture.value.Value = {type: "string", value: Buffer.from(JSON.stringify(cacheTextureData)).toString("base64")};

    if(options.signature !== undefined) {
      cacheTexture.value.Signature = {type: "String", value: options.signature};
    }

    //this.skullOwner.properties.texture = cacheTexture;
  }

  /**
   * createPotionEffect - Create a new Potion effect
   *
   * @param  byte id               id of effect
   * @param  byte amplifier        amplifier of the effect
   * @param  int duration          duration of effect in ticks
   * @param  boolean ambient       if this effect a bacon effect
   * @param  boolean showParticles produces particles
   */
  createPotionEffect(id, amplifier, duration, ambient, showParticles) {
    this.potionEffects.push({Id: {type: 'byte', value: id}, Amplifier: {type: 'byte', value: amplifier}, Duration: {type: 'int', value: duration}, Ambient: {type: 'byte', value: boolToNum(ambient)}, ShowParticles: {type: 'byte', value: boolToNum(showParticles)}});
  }


  /**
   * getNBT - Get the NBT raw data from item structure
   *
   * @return JSON The json NBT data structure
   */
  getNBT() {
    let data = {
      type: "compound",
      name: "",
      value: {}
    };

    // Set general data
    /*
    > 1.8
    if(this.general.damage !== null) {
      data.value.Damage = {
        type: "short",
        value: this.general.damage
      }
    }
    */

    if(this.general.unbreakable !== null) {
      data.value.Unbreakable = {
        type: "byte",
        value: boolToNum(this.general.unbreakable)
      }
    }

    if(this.general.canDestroy !== null) {
      data.value.CanDestroy = {
        type: "list",
        value: {
          type: "string",
          value: this.general.canDestroy
        }
      }
    }

    /*
    > 1.8
    if(this.general.customModelData !== null) {
      data.value.CustomModelData = {
        type: "int",
        value: this.general.customModelData
      }
    }
    */

    if(this.block.canPlaceOn !== null) {
      data.value.CanPlaceOn = {
        type: "list",
        value: {
          type: "string",
          value: this.general.canPlaceOn
        }
      }
    }

    // TODO: BlockEntityTag

    // Enchantments
    if(this.enchantments.length > 0) {
      data.value.ench = {
        type: "list",
        value: {
          type: "compound",
          value: this.enchantments
        }
      }
    }

    if(this.storedEnchantments.length > 0) {
      data.value.StoredEnchantments = {
        type: "list",
        value: {
          type: "compound",
          value: this.storedEnchantments
        }
      }
    }

    if(this.repairCost !== null) {
      data.value.repairCost = {
        type: "int",
        value: this.repairCost
      }
    }


    // Attribute Modifiers
    if(this.attributes.length > 0) {
      data.value.AttributeModifiers = {
        type: "list",
        value: {
          type: "compound",
          value: this.attributes
        }
      }
    }


    // Potion Effect
    if(this.potionEffects.length > 0) {
      data.value.CustomPotionEffects = {
        type: "list",
        value: {
          type: "compound",
          value: this.potionEffects
        }
      }
    }

    if(this.potion !== null) {
      data.value.Potion = {
        type: "string",
        value: this.potion
      }
    }

    // Set display data
    let cacheData = this.getDisplayData();
    if(cacheData !== null) {
      data.value.display = cacheData;
    }

    // Set hide flags
    if(this.display.hideFlags !== null) {
      data.value.HideFlags = {
        type: "int",
        value: this.display.hideFlags
      };
    }


    // Set Book Data
    if(this.resolved) {
      data.value.resolved = {
        type: "byte",
        value: 1
      }
    }

    if(this.generation !== null) {
      data.value.generation = {
        type: "int",
        value: this.generation
      }
    }

    if(this.author !== null) {
      data.value.author = {
        type: "string",
        value: this.author
      }
    }

    if(this.title !== null) {
      data.value.title = {
        type: "string",
        value: this.title
      }
    }

    if(this.pages.length > 0) {
      data.value.pages = {
        type: "list",
        value: {
          type: "string",
          value: this.pages
        }
      }
    }

    // Player Heads
    /*if(this.skullOwner.id !== null && this.skullOwner.name !== null && this.skullOwner.properties.texture !== null) {
      data.value.SkullOwner = {
        type: "compound",
        value: {
          Id: {type: "string", value: this.skullOwner.id},
          Name: {type: "string", value: this.skullOwner.name},
          Properties: {
            type: "compound",
            value: {
              textures: {
                type: "list",
                value: this.skullOwner.properties.texture
              }
            }
          }
        }
      }
    }*/

    if(this.skullOwner.name !== null) {
      data.value.SkullOwner = {
        type: "compound",
        value: {
          Name: {type: "string", value: this.skullOwner.name}
        }
      }

      if(this.skullOwner.id !== null) {
        data.value.SkullOwner.value.Id = {type: "string", value: this.skullOwner.id};
      }

      if(this.skullOwner.properties.texture !== null) {
        data.value.SkullOwner.value.Properties = {
          type: "compound",
          value: {
            textures: {
              type: "list",
              value: this.skullOwner.properties.texture
            }
          }
        };
      }
    }


    if(this.fireworks.flight !== null) {
      if(this.fireworks.flight < -128 || this.fireworks.flight > 127) {
        throw new NBTNumberNotInRangeError(this.fireworks.flight, "-128", "127");
        return;
      }

      data.value.Fireworks.type = "compound";
      data.value.Fireworks.value.Flight = {};
      data.value.Fireworks.value.Flight.type = "byte";
      data.value.Fireworks.value.Flight.value = this.fireworks.flight;
    }

    if(this.fireworks.explosion !== null && this.fireworks.explosion.length > 0) {
      // TODO
    }

    return data;
  }

  /**
   * getDisplayData - Get the display NBT data
   *
   * @return JSON the NBT JSON data
   */
  getDisplayData() {
    let displayData = {};
    displayData.type = "compound";
    displayData.value = {};

    // Set color
    if(this.display.display.color !== null) {
      displayData.value.color = {
        type: "int",
        value: this.display.display.color
      };
    }

    // Set name
    if(this.display.display.name !== null) {
      displayData.value.Name = {
        type: "string",
        value: this.display.display.name
      };
    }

    // Set lore
    if(this.display.display.lore.length > 0) {
      displayData.value.Lore = {
        type: "list",
        value: {
          type: "string",
          value: this.display.display.lore
        }
      };
    }

    if(Object.keys(displayData.value) === 0) {
      displayData = null;
    }
    return displayData;
  }


  /**
   * boolToNum - Parse a boolean to a number
   *
   * @param  {type} bool description
   * @return {type}      description
   */
  boolToNum(bool) {
    if(bool) {
      return 1;
    }
    return 0;
  }
}


module.exports = ItemStructure;
