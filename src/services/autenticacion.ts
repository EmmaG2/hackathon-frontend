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

const BACKEND_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'

// ---------------------------------------------------------------------------
// Gestión del token JWT interno
// ---------------------------------------------------------------------------

export function guardarTokens(accessToken: string, refreshToken: string) {
  sessionStorage.setItem('access_token', accessToken)
  sessionStorage.setItem('refresh_token', refreshToken)
}

export function obtenerAccessToken(): string | null {
  return sessionStorage.getItem('access_token')
}

export function limpiarTokens() {
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('refresh_token')
}

// ---------------------------------------------------------------------------
// Intercambio Firebase ID token → JWT interno
// ---------------------------------------------------------------------------

async function exchangeFirebaseToken(idToken: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token: idToken }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.detail ?? 'Error al autenticar con el servidor')
  }

  const data = await res.json()
  guardarTokens(data.access_token, data.refresh_token)
}

// ---------------------------------------------------------------------------
// Métodos públicos de autenticación
// ---------------------------------------------------------------------------

export async function registrarUsuario(correo: string, contrasena: string) {
  return createUserWithEmailAndPassword(auth, correo, contrasena)
}

export async function iniciarSesion(correo: string, contrasena: string) {
  return signInWithEmailAndPassword(auth, correo, contrasena)
}

/** Inicia sesión con Google y luego canjea el token con el backend. */
export async function iniciarSesionConGoogle() {
  const resultado = await signInWithPopup(auth, proveedorGoogle)
  const idToken   = await resultado.user.getIdToken()
  await exchangeFirebaseToken(idToken)
  return resultado
}

export async function cerrarSesion() {
  limpiarTokens()
  return signOut(auth)
}

export function escucharEstadoUsuario(callback: (usuario: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
