'use client'
import {useEffect,useRef} from 'react'
import {X} from 'lucide-react'
export function Modal({title,close,children}:{title:string;close:()=>void;children:React.ReactNode}) {const ref=useRef<HTMLDialogElement>(null); useEffect(()=>{const el=ref.current;el?.showModal();return()=>el?.close()},[]);return <dialog ref={ref} onCancel={close} aria-label={title} onClick={e=>{if(e.target===ref.current)close()}}><div className="dialog-inner"><div className="flex items-center justify-between gap-3"><h2>{title}</h2><button className="icon" aria-label="Cerrar" onClick={close}><X/></button></div>{children}</div></dialog>}
