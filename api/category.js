import instAxios from "./insAxios";

class Category {
  static getCategory() {
    return instAxios.get("/category");
  }
  static AddCategory(data) {
    return instAxios.post("/category", data);
  }
  static DeleteCategory(id) {
    return instAxios.delete(`/category/${id}`);
  }
  static UpdateCategory(id, data) {
    return instAxios.put(`/category/${id}`, data);
  }
}

export default Category;
