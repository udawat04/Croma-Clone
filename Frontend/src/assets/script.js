async function getData() {
  const url =
    "https://gist.githubusercontent.com/udawat04/d0c3039938486942a8291dd40fb18f68/raw/ca6813238a9482dd4dda40846febb86f4a3b3c30/productdata.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData();