import { getCategories, createPrestation } from "../actions";
import storage from "../../../lib/storage";

export const PrestationsNewPage = async () => {
  const categories = await getCategories();
  return (
    <div>
      <h1>Prestations New Page</h1>
      <div className="w-1/2 p-4 m-auto bg-violet-200 rounded-3xl">
        <form action={createPrestation} className="flex flex-col gap-4">
          <input type="file" name="image" />
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" className="rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" className="rounded-xl h-28" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category">Category</label>
            <select id="category" name="categoryId" className="p-2 rounded-lg">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="p-4 bg-violet-300 rounded-2xl">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrestationsNewPage;
