const formatRupiah = (numberString) => {
    const number = Number(numberString);
    return isNaN(number)
        ? ''
        : new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
          }).format(number);
};

export {formatRupiah}
