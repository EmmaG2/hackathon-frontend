import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export async function subirArchivo(ruta: string, archivo: File) {
  const referencia = ref(storage, ruta)
  await uploadBytes(referencia, archivo)
  return getDownloadURL(referencia)
}

export async function obtenerUrlArchivo(ruta: string) {
  const referencia = ref(storage, ruta)
  return getDownloadURL(referencia)
}

export async function eliminarArchivo(ruta: string) {
  const referencia = ref(storage, ruta)
  return deleteObject(referencia)
}
