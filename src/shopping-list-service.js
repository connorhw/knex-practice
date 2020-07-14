const ShoppingService = {
    getShoppingList(knex) {
        return knex.select('*').from('shopping_list')
    },
    insertListItem(knex, newListItem) {
        return knex
            .insert(newListItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('shopping_list').select('*').where('id', id).first()
    },
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    },
    updateItem(knex, id, newItemFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newItemFields)
    },
}

module.exports = ShoppingService