// getting the phones

export default class DataHandler {
    async fetchData() {
      try {
        const response = await fetch('phones.json');
        const data = await response.json();
        
        const phones = data.items.map(phone => {
          const { name, price } = phone;
          const  id  = phone.id;
          const image = phone.image_url;
          return { id,image, name, price};
        });
        
        return phones;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }