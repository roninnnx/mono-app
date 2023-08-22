const Category = require('../models/category');
const Note = require('../models/note');

   const getAllCategories = async (req, res, next) => {
        try {
            const categories = await Category.findAll({
                include: [{ model: Note }],
            });
            res.json(categories);
        } catch (error) {
            next(error);
        }
    };

   const getCategoryById = async (req, res, next) => {
        try {
            const category = await Category.findByPk(req.params.id, {
                include: [{ model: Note }],
            });
            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    };

createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Buscar si ya existe una categoría con el mismo nombre
        const existingCategory = await Category.findOne({ where: { name } });

        if (existingCategory) {
            // Si la categoría existe, devolver el ID de la categoría existente
            res.status(200).json({ id: existingCategory.id , name: existingCategory.name});
        } else {
            // Si la categoría no existe, crear una nueva categoría
            const newCategory = await Category.create({ name });
            res.status(201).json(newCategory);
        }
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await category.destroy();
        res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategoryById,
    getAllCategories,
    createCategory,
    deleteCategory
};
