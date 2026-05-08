import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

const proveedorGoogle = new GoogleAuthProvider()

export async function registrarUsuario(correo: string, contrasena: string) {
  return createUserWithEmailAndPassword(auth, correo, contrasena)
}

export async function iniciarSesion(correo: string, contrasena: string) {
  return signInWithEmailAndPassword(auth, correo, contrasena)
}

export async function iniciarSesionConGoogle() {
  return signInWithPopup(auth, proveedorGoogle)
}

export async function cerrarSesion() {
  return signOut(auth)
}

export function escucharEstadoUsuario(callback: (usuario: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
