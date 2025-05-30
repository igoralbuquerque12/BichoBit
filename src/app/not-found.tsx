// app/not-found.tsx (App Router) ou pages/404.tsx (Pages Router)

import { Cat } from 'lucide-react';

export default function NotFound() {
    return (
        <div style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#333',
            padding: '20px'
        }}>
            <Cat size={64} strokeWidth={1.5} color="#ff6f61" />
            <h1 style={{ fontSize: '3rem', marginTop: '1rem' }}>Ops... Página não encontrada!</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
                Parece que esse pet se escondeu muito bem. 🐾
            </p>
        </div>
    );
}
