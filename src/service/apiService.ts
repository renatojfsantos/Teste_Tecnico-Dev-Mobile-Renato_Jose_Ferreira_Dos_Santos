// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCategories = async () => {
  try {
    const result = await fetch('https://opentdb.com/api_category.php');
    return await result.json();
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
