export interface Song { id:number; titulo:string; artista:string; album:string; duracion:number; año:number; genero:string; fecha_creacion:string }
export interface User { id:number; nombre:string; correo:string; fecha_registro:string }
export const base=(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/,'')
export async function api<T>(path:string, method='GET', body?:unknown):Promise<T> {
 let res:Response; try {res=await fetch(`${base}/api/${path}`, {method,signal:AbortSignal.timeout(12000),...(body?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})})} catch {throw new Error('No se pudo conectar con FastAPI. Comprueba que el servidor esté disponible y permita este origen mediante CORS.')}
 const data=await res.json().catch(()=>null); if(!res.ok){const msg=data?.detail??data?.message; throw new Error(typeof msg==='string'?msg:Array.isArray(msg)?msg.map(x=>x.msg).join(' · '):`Error del servidor (${res.status})`)} return data
}
export async function allUsers():Promise<User[]> {const users:User[]=[];for(let offset=0;;offset+=100){const page=await api<User[]>(`usuarios?offset=${offset}&limit=100`); users.push(...page);if(page.length<100)return users}}
export const albums=[
 {id:'currents',name:'Currents',artist:'Tame Impala',year:2015,genre:'Psicodelia',text:'Sintetizadores envolventes y melodías que convierten el cambio personal en una pista de baile.'},
 {id:'blonde',name:'Blonde',artist:'Frank Ocean',year:2016,genre:'R&B',text:'Una colección íntima de recuerdos, voces superpuestas y silencios que hablan por sí solos.'},
 {id:'rainbows',name:'In Rainbows',artist:'Radiohead',year:2007,genre:'Rock alternativo',text:'Guitarras entrelazadas y ritmos inquietos en uno de los trabajos más cálidos de Radiohead.'},
 {id:'igor',name:'IGOR',artist:'Tyler, The Creator',year:2019,genre:'Hip hop',text:'Un relato de amor y desencuentro entre sintetizadores saturados y armonías de soul.'},
 {id:'am',name:'AM',artist:'Arctic Monkeys',year:2013,genre:'Indie rock',text:'Riffs nocturnos y ritmos pausados definen este giro en el sonido de la banda de Sheffield.'},
 {id:'discovery',name:'Discovery',artist:'Daft Punk',year:2001,genre:'Electrónica',text:'El house francés se encuentra con la nostalgia disco en un viaje de samples y vocoders.'},
 {id:'ram',name:'Random Access Memories',artist:'Daft Punk',year:2013,genre:'Electrónica',text:'Un homenaje a la era analógica. Descubre el álbum que redefinió el sonido de Daft Punk.'}
]
export type Album=typeof albums[number]
