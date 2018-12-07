'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = _index2.default.generic.getSequelize();
var validAttributeFunctionType = 'array';

/**
 * Check the given dataType actual exists.
 * @param {string} dataType
 */
function validateDataType(dataType) {
  if (!Sequelize.DataTypes[dataType.toUpperCase()]) {
    throw new Error(`Unknown type '${dataType}'`);
  }

  return dataType;
}

function formatAttributes(attribute) {
  var result = void 0;
  var split = attribute.split(':');

  if (split.length === 2) {
    result = { fieldName: split[0], dataType: split[1], dataFunction: null };
  } else if (split.length === 3) {
    var isValidFunction = validAttributeFunctionType === split[1].toLowerCase();
    var isValidValue = validAttributeFunctionType !== split[2].toLowerCase();

    if (isValidFunction && isValidValue) {
      result = { fieldName: split[0], dataType: split[2], dataFunction: split[1] };
    }
  }
  return result;
}

module.exports = {
  transformAttributes(flag) {
    /*
      possible flag formats:
      - first_name:string,last_name:string,bio:text,reviews:array:string
      - 'first_name:string last_name:string bio:text reviews:array:string'
      - 'first_name:string, last_name:string, bio:text, reviews:array:string'
    */

    var attributeStrings = flag.replace(/,/g, ' ').split(/\s+/);

    return attributeStrings.map(function (attribute) {
      var formattedAttribute = formatAttributes(attribute);

      try {
        validateDataType(formattedAttribute.dataType);
      } catch (err) {
        throw new Error(`Attribute '${attribute}' cannot be parsed: ${err.message}`);
      }

      return formattedAttribute;
    });
  },

  generateFileContent(args) {
    return _index2.default.template.render('models/model.js', {
      name: args.name,
      attributes: this.transformAttributes(args.attributes),
      underscored: args.underscored
    });
  },

  generateFile(args) {
    var modelPath = _index2.default.path.getModelPath(args.name);

    _index2.default.asset.write(modelPath, this.generateFileContent(args));
  },

  modelFileExists(filePath) {
    return _index2.default.path.existsSync(filePath);
  }
};