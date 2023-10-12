/**
 * Compara dos objetos y devuelve un objeto con las propiedades que han sido modificadas.
 * @param {Object} initialState - El estado inicial.
 * @param {Object} updatedState - El estado actualizado que se compara con el estado inicial.
 * @returns {Object} Un objeto que contiene las propiedades modificadas y sus nuevos valores.
 */
export const compareObjects = (initialState, updatedState) => {
  const editedFields = {};

  for (const key in initialState) {
    if (initialState[key] !== updatedState[key]) {
      editedFields[key] = updatedState[key];
    }
  }

  return editedFields;
};

/**
 * Compara dos arrays de objetos y devuelve un array con los elementos que han sido modificados.
 * @param {Array} initialArray - El array inicial.
 * @param {Array} updatedArray - El array actualizado que se compara con el array inicial.
 * @returns {Array} Un array que contiene los elementos modificados.
 */
export const compareArrayObjects = (initialArray, updatedArray) => {
  const editedElements = [];

  for (let i = 0; i < initialArray.length && i < updatedArray.length; i++) {
    const initialElement = initialArray[i];
    const updatedElement = updatedArray[i];

    let hasChanges = false;

    for (const key in initialElement) {
      // Verificar que los elementos existan y tengan la propiedad 'name' antes de comparar
      if (
        initialElement?.hasOwnProperty(key) &&
        updatedElement?.hasOwnProperty(key) &&
        initialElement[key] !== updatedElement[key]
      ) {
        hasChanges = true;
        break;
      }
    }

    if (hasChanges) {
      editedElements.push(updatedElement);
    }
  }

  return editedElements;
};
