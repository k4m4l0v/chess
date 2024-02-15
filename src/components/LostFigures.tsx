import React from 'react';
import { Figure } from '../models/figures/Figure';

interface ILostFiguresProps {
    title: string;
    figures: Figure[];
}

export function LostFigures({title, figures}: ILostFiguresProps) {
    return (
        <div className='lost'>
            <h2>{title}</h2>
            {figures.map(figure =>
                <div key={figure.id}>
                    {figure.name} {figure.logo && <img src={figure.logo} alt='фигура' width={20} height={20} />}
                </div>    
            )}
        </div>
    )
}
