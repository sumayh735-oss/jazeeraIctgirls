module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'channels',
    timestamps: true
  });

  return Channel;
};