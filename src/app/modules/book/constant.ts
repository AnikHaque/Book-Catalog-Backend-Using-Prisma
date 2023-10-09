export const bookSearchAndFilter = ['search', 'author', 'genre', 'categoryId'];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookRelationalFields = ['categoryId'];

export const bookRelationalFieldsMapper: { [key: string]: string} = {
  categoryId: 'category',
};
