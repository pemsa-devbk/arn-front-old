
export const cronToString = (cron: string) => {
    const [min, hour, dayMounth, , dayWeek] = cron.split(' ');
    if(cron){
        if (min.includes('/')) {
            return `Cada ${min.split('/')[1]} minuto(s)`;
        } else if (hour.includes('/')) {
            return `Cada ${hour.split('/')[1]} Hora(s)`;
        } else if (dayMounth !== '*') {
            return `Mensual el día ${dayMounth} a las ${hour}:${min}`;
        } else if (dayWeek !== '*') {
            let day: string = '';
            if (dayWeek.length === 1) {
                switch (dayWeek) {
                    case '0': day = 'domingo'; break;
                    case '1': day = 'lunes'; break;
                    case '2': day = 'martes'; break;
                    case '3': day = 'miercoles'; break;
                    case '4': day = 'jueves'; break;
                    case '5': day = 'viernes'; break;
                    case '6': day = 'sabado'; break;
                    case '7': day = 'domingo'; break;
                }
                return `Semanal el día ${day} a las ${hour}:${min}`;
            } else {
                const days = dayWeek.split(',');
                days.forEach(dayW => {
                    switch (dayW) {
                        case '0': day += 'domingo,'; break;
                        case '1': day += 'lunes,'; break;
                        case '2': day += 'martes,'; break;
                        case '3': day += 'miercoles,'; break;
                        case '4': day += 'jueves,'; break;
                        case '5': day += 'viernes,'; break;
                        case '6': day += 'sabado,'; break;
                        case '7': day += 'domingo,'; break;
                    }
                })
                return `Los dias ${day} a las ${hour}:${min}`;
            }
        } else {
            return `Diario a las ${hour}:${min}`;
        }
    }
    return `Horario desconocido`;



    // let schedule: string = `a las ${hour}:${min}`;
    // if (dayMounth !== '*') { // Se ejecuta mensual
    //     return `Mensual el dia ${dayMounth} de cada mes ${schedule}`
    // } else {
    //     if (dayWeek === '*') { // Se ejecuta diario
    //         return `Diario ${schedule}`
    //     } else {
    //         let day: string = '';
    //         if (dayWeek.length === 1) { // Semanal
    //             switch (dayWeek) {
    //                 case '0': day = 'domingo'; break;
    //                 case '1': day = 'lunes'; break;
    //                 case '2': day = 'martes'; break;
    //                 case '3': day = 'miercoles'; break;
    //                 case '4': day = 'jueves'; break;
    //                 case '5': day = 'viernes'; break;
    //                 case '6': day = 'sabado'; break;
    //                 case '7': day = 'domingo'; break;
    //             }
    //             return `Semanal el día ${day} ${schedule}`
    //         } else { // Se ejecuta varios dias
    //             const days = dayWeek.split(',');
    //             days.forEach(dayW => {
    //                 switch (dayW) {
    //                     case '0': day += 'domingo,'; break;
    //                     case '1': day += 'lunes,'; break;
    //                     case '2': day += 'martes,'; break;
    //                     case '3': day += 'miercoles,'; break;
    //                     case '4': day += 'jueves,'; break;
    //                     case '5': day += 'viernes,'; break;
    //                     case '6': day += 'sabado,'; break;
    //                     case '7': day += 'domingo,'; break;
    //                 }
    //             })
    //             return `Los dias ${day} ${schedule}`;
    //         }
    //     }
    // }
}