import './style.css'

const btn = document.querySelector<HTMLButtonElement>('#btn');

btn?.addEventListener('click', tableOfUsers)

function tableOfUsers(): void {
  const table = document.querySelector<HTMLTableElement>('#table');
  const xhr = new XMLHttpRequest();
  const dots = document.querySelector<HTMLDivElement>('.three-body');
  xhr.open('Get', 'https://api.github.com/users', true);
  xhr.onloadstart = () => {
    dots!.style.display = 'block';
  };
  xhr.onload = function(){
    if(xhr.status === 200){
      const users = JSON.parse(xhr.responseText);
      let outPut = '';
      let sum: number = 0;

      users
      ?.forEach((e: {login: string; id: number, followers_url: string}) => {
        outPut += '<tbody>' + 
        `<td>${e.login}</td>` +
          `<td>${e.id}</td>` +
          `<td>${e.followers_url}</td>` +
        '</tbody>';
        ++sum;
      });
      const tFooter = document.createElement('tfoot');
      tFooter.innerHTML = `<tfoot>Total of Users: ${sum}</tfoot>`;
      dots!.style.display = 'none';
      table!.innerHTML = outPut;
      table!.appendChild(tFooter);
    }else {
    alert('problem of network');
    }
  } 
  xhr.send()
}
