export default {
    methods: {
        getTdColor(status) {
            alert('223')
            let color = '';
            switch(status){
                case 'created':
                    color = 'green'
                    break;
                case 'pending-deposit':
                    color = 'blue'
                    break;
                case 'check-in-process':
                    color = 'yellow'
                    break;
                case 'revision-pm':
                    color = 'red'
                    break;
                case 'revision-reviewer':
                    color = 'red'
                    break;
                case 'rejected':
                    color = 'red'
                    break;
                case 'canceled':
                    color = 'orange'
                    break;
                case 'collection':
                    color = 'red'
                    break;
                case 'pending-refund':
                    color = 'cyan'
                    break;
                case 'to-finalize':
                    color = 'cyan'
                    break;
                case 'finished':
                    color = 'cyan'
                    break;
                case 'revision-refund':
                    color = 'purple'
                    break;
            }
            return color;
        },
        
    }
    
}