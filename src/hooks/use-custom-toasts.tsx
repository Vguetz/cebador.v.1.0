import { buttonVariants } from '@/components/ui/Button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Inicio de sesión.',
      description: 'Para chusmear tenes que entrar.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/sign-in'
          className={buttonVariants({ variant: 'outline' })}>
          Iniciar sesión
        </Link>
      ),
    })
  }

  return { loginToast }
}
