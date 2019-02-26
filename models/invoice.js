'use strict';
module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define('invoice', {
    user_id: DataTypes.INTEGER,
    viatic_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    rfc_id: DataTypes.INTEGER,
    concept_id: DataTypes.INTEGER,
    path_xml: DataTypes.STRING,
    path_pdf: DataTypes.STRING,
    uuid: DataTypes.STRING,
    folio: DataTypes.STRING,
    date: DataTypes.DATE,
    deductible: DataTypes.INTEGER,
    company_rfc: DataTypes.STRING,
    company_name: DataTypes.STRING,
    subtotal: DataTypes.DECIMAL,
    iva: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
  };
  return invoice;
};