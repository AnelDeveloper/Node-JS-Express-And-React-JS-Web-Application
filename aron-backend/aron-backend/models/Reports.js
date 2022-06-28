

module.exports = (sequelize, DataTypes) => {

    const Reports = sequelize.define("Reports", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        report_desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        img: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: "",
        }

    }, {timestamps: false,})


    

    return Reports;
}