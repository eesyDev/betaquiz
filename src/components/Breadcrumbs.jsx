import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathParts = pathname.split('/').filter(x => x);

    // Словарь для маппинга URL на русские названия
    const titles = {
        "about": "О нас",
        "quizes": "Квизы",
        "classes": "Уроки",
        "mygroups": "Группы",
        "results": "Результаты",
		"create-quiz": "Создать квиз",
		"questions": "Вопросы",
        "all-questions": "Все вопросы",
		"create-question": "Создать вопрос",
		"account": "Личный кабинет",
    };

    const breadcrumbPaths = pathParts.map((part, index) => ({
        path: '/' + pathParts.slice(0, index + 1).join('/'),
        breadcrumb: titles[part] || part // Используем название из словаря или сам сегмент, если не нашли соответствия
    }));

    return (
        <div className='breadcrumbs'>
            <Link to="/">Главная</Link>
            {breadcrumbPaths.map((crumb, index) => (
                <span key={crumb.path}>
                    {" / "}
                    {index + 1 === breadcrumbPaths.length ? (
                        <span>{crumb.breadcrumb}</span>
                    ) : (
                        <Link to={crumb.path}>{crumb.breadcrumb}</Link>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
