const truncateText = (text, wordLimit) => {
    // Pastikan text adalah string
    if (typeof text !== 'string') return ''; // Kembalikan string kosong jika bukan string

    const words = text.split(' '); // Memecah teks menjadi array kata
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Menggabungkan kembali 8 kata pertama dan menambahkan elipsis
    }
    return text; // Mengembalikan teks asli jika kurang dari atau sama dengan 8 kata
  };

export {truncateText}