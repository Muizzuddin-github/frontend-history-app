import instAxios from "./insAxios";

class Info {
  static Add(idCategory, data) {
    return instAxios.post(`/category/${idCategory}`, data);
  }
  static del(idCategory, idInfo) {
    return instAxios.delete(`/category/${idCategory}/info/${idInfo}`);
  }
  static UpdateImage(idCategory, idInfo, data) {
    return instAxios.put(`/category/${idCategory}/info-image/${idInfo}`, data);
  }
  static UpdateNoImage(idCategory, idInfo, data) {
    return instAxios.put(`/category/${idCategory}/info/${idInfo}`, data);
  }
}

export default Info;
