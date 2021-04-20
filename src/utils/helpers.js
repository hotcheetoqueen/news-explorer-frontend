const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

module.exports.formatDate = (published) => {
  const [year, month] = published.split('-');
  const [day] = published.split('-')[2].split('T');
  return `${months[month - 1]} ${day}, ${year}`;
};